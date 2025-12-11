// КОД. ФАЙЛ: src/pages/campaigns/edit/ui.tsx (НОВЫЙ ФАЙЛ)

import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { UpdateCampaignForm } from "../../../features/campaign/ui/UpdateCompaignForm/UpdateCompaignForm";

const EditCampaignPage: FC = () => {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <Link to="/campaigns" style={{ display: "block", marginBottom: "20px" }}>
        ← Назад к списку
      </Link>
      <UpdateCampaignForm />
    </div>
  );
};

export default EditCampaignPage;
