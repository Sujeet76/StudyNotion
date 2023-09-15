import React from "react";
import { VideoDescription, Player } from "../../Components";

const VideoDetailPage = ({ setClicked }) => {
  return (
    <div>
      <Player setClicked={setClicked} />
      <VideoDescription />
    </div>
  );
};

export default VideoDetailPage;
