// КОД. ФАЙЛ: src/shared/ui/Badge/Badge.tsx

import React, { type FC } from "react";
import styles from "./Badge.module.css";
import type { CampaignStatus } from "../../../entities/compaign/model/types";

interface BadgeProps {
  status: CampaignStatus;
}

const statusMap: Record<CampaignStatus, string> = {
  ACTIVE: styles.active,
  PAUSED: styles.paused,
  ARCHIVED: styles.archived,
};

export const Badge: FC<BadgeProps> = ({ status }) => {
  const statusClass =
    statusMap[status.toUpperCase() as CampaignStatus] || styles.archived;

  return <span className={`${styles.badge} ${statusClass}`}>{status}</span>;
};
