// КОД. ФАЙЛ: src/pages/campaigns/create/ui.tsx

import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { CreateCampaignForm } from "../../../features/campaign/ui/CreateCompaignForm/CreateCompaignForm";

const CreateCampaignPage: FC = () => {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <Link to="/campaigns" style={{ display: "block", marginBottom: "20px" }}>
        ← Назад к списку
      </Link>
      <CreateCampaignForm />
    </div>
  );
};

export default CreateCampaignPage;
