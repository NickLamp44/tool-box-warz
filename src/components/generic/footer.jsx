import React from "react";

const curYear = new Date().getFullYear();

export default function Footer() {
  return (
    <section>
      <p>
        <span className="text-xl sm:text-2xl">&copy;</span> {curYear} .
        ToolBoxWarz ALL RIGHTS RESERVED
      </p>
    </section>
  );
}
