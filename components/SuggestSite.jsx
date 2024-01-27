"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../app/Styles/SuggestSite.scss";
import { Cross2Icon } from "@radix-ui/react-icons";
import { sendDiscordMessage } from "@/components/alertDiscord";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const SuggestSite = () => {
  const [siteName, setSiteName] = useState("Arkhio");
  const [siteURL, setSiteURL] = useState("arkhio.com");
  const supabase = createClientComponentClient();
  const handleSend = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await sendDiscordMessage(`Site Name: ${siteName}\n\nSite URL: ${siteURL}\n\nSuggested User: ${user.email}`);

  
  };

  return (
    <div className="suggest-site">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="Button suggest-site-btn">Suggest a Website</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Suggest a website!
            </Dialog.Title>
            <Dialog.Description className="DialogDescription">
              We try to add websites weekly, so suggest any websites that you
              use to help other developers.
            </Dialog.Description>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Site Name
              </label>
              <input className="Input" id="name" defaultValue="Arkhio"  onChange={(e) => setSiteName(e.target.value)}/>
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="username">
                Site URL
              </label>
              <input
                className="Input"
                id="username"
                defaultValue="arkhio.com"
                onChange={(e) => setSiteURL(e.target.value)}
              />
            </fieldset>
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <Dialog.Close asChild>
                <button className="Button green" onClick={handleSend}>
                  Send
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default SuggestSite;
