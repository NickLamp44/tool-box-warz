// Frameworks & Libraries

// Pages & Components

// Styling

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import MerchCard from "./merchCard";

export default function MerchList() {
  const [merchIds, setMerchIds] = useState([]);

  useEffect(() => {
    const fetchMerchIds = async () => {
      const merchRef = collection(db, "merch");
      const snapshot = await getDocs(merchRef);
      const ids = snapshot.docs.map((doc) => doc.id);
      setMerchIds(ids);
    };
    fetchMerchIds();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {merchIds.map((id) => (
        <MerchCard key={id} merchId={id} />
      ))}
    </div>
  );
}
