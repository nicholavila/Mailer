import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { updateCampaignBounced } from "@/data/campaign/campaign-update-bounced";
import { updateCampaignOpened } from "@/data/campaign/campaign-update-opened";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    campaignId: string;
    subscriberEmail: string;
  };
};

// ## http://localhost:3000/api/open/campaign-id/user-email

export const POST = async (request: NextRequest, { params }: Params) => {
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const _bouncedEmails = campaign.bouncedEmails || [];
  const isAlreadyOpened = _bouncedEmails.includes(subscriberEmail);
  if (isAlreadyOpened) {
    return NextResponse.json(
      { error: "Email was already regitered as bounced" },
      { status: 404 }
    );
  }

  const bouncedEmails = [..._bouncedEmails, subscriberEmail];
  const res = await updateCampaignBounced(campaignId, bouncedEmails);

  if (res?.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
};