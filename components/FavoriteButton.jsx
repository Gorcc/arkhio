import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/server";

const FavoriteButton = ({ userData, postId, userFavs }) => {
  const supabase = createClient(cookieStore);
  const [like, setLike] = useState();

  const handleLike = () => {
    if (userData) {
      setLike((prevLike) => !prevLike);
    }
  };

  const fetchData = async () => {
    if (userData && like) {
      try {
        const { data: userDataFromDB, error: fetchError } = await supabase
          .from("users")
          .select("favorites")
          .eq("id", userData.id)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError.message);
          return;
        }

        const currentFavorites = userDataFromDB?.favorites || [];
        let indexOfAddedPost;
        if (!currentFavorites.includes(postId)) {
          const updatedFavorites = [...currentFavorites, postId];

          const { error: updateError } = await supabase
            .from("users")
            .upsert([{ id: userData.id, favorites: updatedFavorites }], {
              onConflict: ["id"],
            });

          if (updateError) {
            console.error("Error updating user data:", updateError.message);
          } else {
          }
        } else {
          indexOfAddedPost = currentFavorites.indexOf(postId);
          currentFavorites.splice(indexOfAddedPost, 1);
          const { error: updateError } = await supabase
            .from("users")
            .upsert([{ id: userData.id, favorites: currentFavorites }], {
              onConflict: ["id"],
            });
        }
      } catch (error) {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [like, userData, postId]);

  useEffect(() => {
    if (userData && userFavs[0].favorites.includes(postId)) {
      setLike(true);
    }
  }, []);

  return (
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
                You need to be logged in to favorite websites. Or you can just
                sign up with two simple steps.
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
          className={`heart-icon ${like ? "liked" : ""}  `}
          icon={faHeart}
        ></FontAwesomeIcon>
      )}
    </div>
  );
};

export default FavoriteButton;
