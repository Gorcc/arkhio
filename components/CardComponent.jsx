"use client";
import React from "react";
import "../app/Styles/CardComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";

const CardComponent = ({
  title,
  description,
  type,
  image,
  url,
  userData,
  id,
}) => {
  const supabase = createClientComponentClient();
  
  // Fetch data and add it to users favorites

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if(userData){

      
  //     const { data, error } = await supabase
  //       .from("users")
  //       .select()
  //       .eq(userData.id);
    

  //     }
  //   };
  // },);

  const [like, setLike] = useState(false);
  const handleLike = () => {
    if (userData) {
      setLike((prevLike) => !prevLike);
      console.log(id);
    }
  };

  const typeClassMap = {
    UI: "ui",
    Design: "design",
    Icon: "icon",
    Code: "code",
  };
  const typeClass = typeClassMap[type] || "";

  return (
    <div className="card-container">
      <a href={url} target="_blank">
        <img src={image} alt="" />
      </a>

      <div className="title-fav">
        <div className="card-title">
          <h1>{title}</h1>
        </div>
        <div className="card-icon">
          {!userData && (
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <FontAwesomeIcon
                  onClick={handleLike}
                  className={`heart-icon ${like ? "liked" : ""}`}
                  icon={faHeart}
                ></FontAwesomeIcon>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="AlertDialogOverlay" />
                <AlertDialog.Content className="AlertDialogContent">
                  <AlertDialog.Title className="AlertDialogTitle">
                    You are not logged in.
                  </AlertDialog.Title>
                  <AlertDialog.Description className="AlertDialogDescription">
                    You need to be logged in to favorite websites. Or you can
                    just sign up with two simple steps.
                  </AlertDialog.Description>
                  <div
                    style={{
                      display: "flex",
                      gap: 25,
                      justifyContent: "flex-end",
                    }}
                  >
                    <AlertDialog.Cancel asChild>
                      <button className="Button mauve">Cancel</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Cancel asChild>
                      <a href="/login" className="Button green">
                        Login
                      </a>
                    </AlertDialog.Cancel>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          )}
          {userData && (
            <FontAwesomeIcon
              onClick={handleLike}
              className={`heart-icon ${like ? "liked" : ""}`}
              icon={faHeart}
            ></FontAwesomeIcon>
          )}
        </div>
      </div>
      <div className="card-description">{description}</div>
      <div className={`card-type ${typeClass}`}>{type}</div>
    </div>
  );
};
("");

export default CardComponent;
