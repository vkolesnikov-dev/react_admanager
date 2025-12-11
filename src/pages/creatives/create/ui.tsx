// КОД. ФАЙЛ: src/pages/creatives/create/ui.tsx (НОВЫЙ ФАЙЛ)

import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { CreateCreativeForm } from "../../../features/creative/ui/CreateCreativeForm/CreateCreativeForm";

const CreateCreativePage: FC = () => {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <Link to="/creatives" style={{ display: "block", marginBottom: "20px" }}>
        ← Назад к списку креативов
      </Link>
      <CreateCreativeForm />
    </div>
  );
};

export default CreateCreativePage;
