"use client";

import { DefaultJsonData } from "@/assets/default-email-json";
import { Button } from "@/components/ui/button";
import { campaignAtom, emailAtom } from "@/store/customers-atom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

const NewEmail = () => {
  const history = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState<any>(DefaultJsonData);

  const [emailTemplate, setEmailTemplate] = useAtom(emailAtom);
  const [campaign] = useAtom(campaignAtom);

  const emailEditorRef = useRef<EditorRef>(null);

  useEffect(() => {}, []);

  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer: any = emailEditorRef.current?.editor;
    unlayer.loadDesign(jsonData);
  };

  const onSaveExist = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
      setEmailTemplate({
        design,
        html
      });
      history.push(`/campaign/edit-campaign/${campaign.campaignId}`);
    });
  };

  return (
    <div className="w-5/6 flex flex-col py-6">
      <div className="w-full flex items-end justify-between pb-4">
        <p className="text-3xl text-green-700 font-semibold">
          Create a new Email
        </p>
        <Button onClick={onSaveExist}>Save & Exist</Button>
      </div>

      <EmailEditor minHeight={"80vh"} ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default NewEmail;
