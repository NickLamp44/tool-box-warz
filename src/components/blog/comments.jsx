// Comments: Basic Comments w/ replies and reactions

// Frameworks & Libraries

// Pages & Components

// Styling

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import { db } from "../../services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

const EMOJIS = [
  "👍",
  "💯",
  "👌",
  "👏",
  "🔥",
  "💀",
  "🫡",
  "👎",
  "👀",
  "🙌",
  "🎯",
  "🤨",
  "🧐",
  "😂",
  "😬",
  "🥲",
  "😎",
  "😤",
  "💥",
];

const Comments = ({ blogId, showCaseId }) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("blogId", "==", blogId || showCaseId),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => doc.data());
      setComments(fetched);
    });

    return () => unsubscribe();
  }, [blogId, showCaseId]);

  const handlePost = async (content, parentId = null) => {
    if (!content.trim()) return;

    const id = crypto.randomUUID();
    const newComment = {
      blogId,
      showCaseId,
      id,
      authorId: "anonymous",
      content: content.trim(),
      replies: [],
      reactions: {},
      timestamp: Timestamp.now(),
    };

    await addDoc(collection(db, "comments"), newComment);

    if (parentId) {
      const parentDoc = doc(db, "comments", parentId);
      const parent = comments.find((c) => c.id === parentId);
      await updateDoc(parentDoc, {
        replies: [...(parent?.replies || []), id],
      });
      setReplyInputs((prev) => ({ ...prev, [parentId]: "" }));
    } else {
      setInput("");
    }
  };

  const handleReaction = async (commentId, emoji) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    const currentCount = comment.reactions?.[emoji] || 0;
    const updatedReactions = {
      ...comment.reactions,
      [emoji]: currentCount + 1,
    };

    await updateDoc(doc(db, "comments", commentId), {
      reactions: updatedReactions,
    });
  };

  const renderReactions = (comment) => (
    <Box display="flex" gap={1}>
      {EMOJIS.map((emoji) => (
        <IconButton
          key={emoji}
          size="small"
          onClick={() => handleReaction(comment.id, emoji)}
        >
          <Typography variant="caption">
            {emoji} {comment.reactions?.[emoji] || ""}
          </Typography>
        </IconButton>
      ))}
    </Box>
  );

  const renderReplies = (commentId, depth = 1) =>
    comments
      .filter((c) => c.replies.includes(commentId))
      .map((reply) => (
        <Box key={reply.id} sx={{ pl: depth * 4, mt: 1 }}>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="body2">{reply.content}</Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Box>{renderReactions(reply)}</Box>
            </Box>
          </Paper>
          <Box mt={1}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Reply..."
              value={replyInputs[reply.id] || ""}
              onChange={(e) =>
                setReplyInputs({ ...replyInputs, [reply.id]: e.target.value })
              }
            />
            <Button
              size="small"
              onClick={() => handlePost(replyInputs[reply.id], reply.id)}
              sx={{ mt: 1 }}
            >
              Reply
            </Button>
          </Box>
          {renderReplies(reply.id, depth + 1)}
        </Box>
      ));

  const renderComment = (comment) => (
    <Box key={comment.id} sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="body1">{comment.content}</Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Box>{renderReactions(comment)}</Box>
        </Box>
      </Paper>

      <Box mt={1}>
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          placeholder="Reply..."
          value={replyInputs[comment.id] || ""}
          onChange={(e) =>
            setReplyInputs({ ...replyInputs, [comment.id]: e.target.value })
          }
        />
        <Button
          size="small"
          onClick={() => handlePost(replyInputs[comment.id], comment.id)}
          sx={{ mt: 1 }}
        >
          Reply
        </Button>
      </Box>

      {renderReplies(comment.id)}
    </Box>
  );

  const topLevelComments = comments.filter((c) =>
    comments.every((other) => !other.replies.includes(c.id))
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add a comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" onClick={() => handlePost(input)}>
          Post
        </Button>
      </Stack>

      {topLevelComments.map(renderComment)}
    </Box>
  );
};

export default Comments;
