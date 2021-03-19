export const actionTypes = {
  SET_CURRENT_VIDEO_INFO: 'SET_CURRENT_VIDEO_INFO',
  SET_CURRENT_VIDEO_PLAYER: 'SET_CURRENT_VIDEO_PLAYER',
};

// SET_CURRENT_VIDEO
export const setCurrentVideo = (payload) => ({
  type: actionTypes.SET_CURRENT_VIDEO_INFO,
  payload,
});

// SET_CURRENT_VIDEO_PLAYER
export const setCurrentVideoPlayer = (payload) => ({
  type: actionTypes.SET_CURRENT_VIDEO_PLAYER,
  payload,
});
