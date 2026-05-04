import { useState, useRef, useEffect, useCallback } from "react";
import { useFetch } from "~/hooks/use-fetch";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// Reducers
import { updateSessionConfiguration } from "~/redux/features/session-slice";
import {
  updatePoolsData,
  updatePollsLoading,
  updatePollsError,
} from "~/redux/features/polls-slice";
import {
  updateTranscriptData,
  updateTranscriptLoading,
  updateTranscriptError,
} from "~/redux/features/transcript-slice";

import { setVideo } from "./redux/features/session-ui-slice";

// Components
import ConditionalWrapper from "~/components/conditional-wrapper";
import Video from "~/components/video/video";
import Panels from "~/components/panels/panels";
import Chat from "~/components/chat/chat";
import Footer from "~/components/footer/footer";

// Config File
import config from "~/config.json";

// Styles
import "~/app.scss";

// Exporting the App Component
export default function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // Building the URLs to fetch
  const sessionDataFolder = config.sessions_folder;
  const transcriptDataFolder = config.transcripts_folder;
  const pollsDataFolder = config.polls_folder;

  const urlParams = new URLSearchParams(window.location.search);
  const sessionName = urlParams.get("session");

  const sessionUrlToFetch = sessionDataFolder + "/" + sessionName;
  const transcriptUrlToFetch = transcriptDataFolder + "/" + sessionName;
  const pollsUrlToFetch = pollsDataFolder + "/" + sessionName;

  // Checking if there is a Video Starting Time passed in the "t" query of the URL
  const videoStartTimeFromQuery = urlParams.get("t");

  // Fetching data with useFetch() custom hook
  // Pass the URL in the browser, example: http://localhost:3000/Playout/?session=IETF112-DISPATCH-20211108-1200&t=01h10m08s
  const {
    data: sessionData,
    isLoading: isSessionLoading,
    error: isSessionError,
  } = useFetch(sessionUrlToFetch);

  const {
    data: transcriptData,
    isLoading: isTranscriptLoading,
    error: isTranscriptError,
  } = useFetch(transcriptUrlToFetch);

  const {
    data: pollsData,
    isLoading: isPollsLoading,
    error: isPollsError,
  } = useFetch(pollsUrlToFetch);

  // Dispatch the action to update the Session slice when the resource is received from the useFetch Hook
  useEffect(() => {
    // Session Data
    if (sessionData) {
      dispatch(updateSessionConfiguration(sessionData));
    }
  }, [sessionData, dispatch]);

  useEffect(() => {
    // Transcripts Data
    if (transcriptData) {
      dispatch(updateTranscriptData(transcriptData));
    }
    dispatch(updateTranscriptLoading(isTranscriptLoading));
    dispatch(updateTranscriptError(isTranscriptError));
  }, [transcriptData, isTranscriptLoading, isTranscriptError, dispatch ]);

  useEffect(() => {
    // Polls Data
    if (pollsData) {
      dispatch(updatePoolsData(pollsData));
    }
    dispatch(updatePollsLoading(isPollsLoading));
    dispatch(updatePollsError(isPollsError));
  }, [pollsData, isPollsLoading, isPollsError, dispatch]);

  // Video Timer State
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareNotice, setShareNotice] = useState("");
  const [shareLinkOverlay, setSharLinkOverlay] = useState("");

  // Components State, in the mobile version the default panel is the Chat
  const [showChat, setShowChat] = useState(true);

  // react-responsive Media Queries & useVH() for viewport height problems
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  // Theme Selector
  const isDarkThemeEnabled = useSelector(
    (state) => state.sessionUI.isDarkThemeEnabled
  );

  // State Handlers
  const handleCurrentTime = useCallback((time) => {
    setCurrentTime(time);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleComponents = () => {
    setShowChat(!showChat);
  };

  // Video Player
  const videoElement = useRef(null);

  const seekTo = useCallback((time) => {
    videoElement.current?.seekTo(time);
    setIsPlaying(true);
  }, []);

  // Video Scroll Into View
  const videoContainerRef = useRef(null);
  const shareNoticeTimerRef = useRef();

  const handleScrollVideoIntoView = () => {
    videoContainerRef.current?.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "nearest",
    });
  };

  const copyTextWithFallback = async (text) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.append(textarea);
    textarea.select();

    const copySucceeded = document.execCommand("copy");
    textarea.remove();
    return copySucceeded;
  };

  const showShareNotice = useCallback((message) => {
    setShareNotice(message);

    if (shareNoticeTimerRef.current) {
      window.clearTimeout(shareNoticeTimerRef.current);
    }

    shareNoticeTimerRef.current = window.setTimeout(() => {
      setShareNotice("");
    }, 3000);
  }, []);

  const showShareLinkOverlay = useCallback((link) => {
    setSharLinkOverlay(link);
  }, []);

  const closeSharLinkOverlay = useCallback(() => {
    setSharLinkOverlay("");
  }, []);

  useEffect(() => {
    return () => {
      if (shareNoticeTimerRef.current) {
        window.clearTimeout(shareNoticeTimerRef.current);
      }
    };
  }, []);

  // Share video at current Location
  const handleShare = async () => {
    try {
      // Create a URL object from the current window location
      const url = new URL(window.location.href);

      // Convert currentTime to an integer
      const timeInSeconds = Math.floor(currentTime);

      // Safely set or update the 't' query parameter
      url.searchParams.set("t", timeInSeconds);

      const shareUrl = url.toString();
      const copied = await copyTextWithFallback(shareUrl);

      if (copied) {
        showShareNotice(t("str_urlCopiedToClipboard", "URL copied to clipboard!"));
      } else {
        showShareLinkOverlay(shareUrl);
      }
    } catch (error) {
      console.error("Failed to copy link", error);
      const fallbackUrl = new URL(window.location.href);
      fallbackUrl.searchParams.set("t", Math.floor(currentTime));
      showShareLinkOverlay(fallbackUrl.toString());
    }
  };

useEffect(() => {
  if (sessionData?.videos?.length > 0) {
    const { type, src, start = 0 } = sessionData.videos[0];
    dispatch(setVideo({ type, src, start, videoStartTimeFromQuery }));
  }
}, [sessionData, dispatch, videoStartTimeFromQuery]);

  // Rendering App Component
  return (
    <div
      className={`App ${isDarkThemeEnabled ? "theme--dark" : "theme--light"}`}
    >
      {isSessionError && (
        <div className="error">
          <h1>{isSessionError}</h1>
        </div>
      )}

      {isSessionLoading && (
        <div className="loading">
          <h1>{t("str_loading", "Loading")}...</h1>
        </div>
      )}

      {shareNotice && (
        <div className="notice">
          <h1>{shareNotice}</h1>
        </div>
      )}

      {shareLinkOverlay && (
        <div className="share-link-overlay" onClick={closeSharLinkOverlay}>
          <div className="share-link-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{t("str_copyThisLink", "Copy this link:")}</h2>
            <div className="share-link-input">
              <input
                type="text"
                value={shareLinkOverlay}
                readOnly
                onClick={(e) => e.target.select()}
              />
              <button
                className="share-link-copy-btn"
                onClick={async () => {
                  await copyTextWithFallback(shareLinkOverlay);
                  showShareNotice(t("str_urlCopiedToClipboard", "URL copied to clipboard!"));
                  closeSharLinkOverlay();
                }}
              >
                {t("str_copy", "Copy")}
              </button>
            </div>
            <button className="share-link-close-btn" onClick={closeSharLinkOverlay}>
              {t("str_close", "Close")}
            </button>
          </div>
        </div>
      )}

      {sessionData && (
        <div
          className={
            showChat
              ? "main-container show--chat"
              : "main-container show--panels"
          }
        >
          <ConditionalWrapper
            condition={!isTabletOrMobile}
            wrapper={(children) => <div className="Left-Side">{children}</div>}
          >
            <>
              <div className="Video" ref={videoContainerRef}>
                <Video
                  refCallback={videoElement}
                  currentTime={currentTime}
                  handleCurrentTime={handleCurrentTime}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                  seekTo={seekTo}
                  handlePlayPause={handlePlayPause}
                  isPlaying={isPlaying}
                />
              </div>

              <Panels
                data={sessionData}
                showChat={showChat}
                handleCurrentTime={handleCurrentTime}
                seekTo={seekTo}
                currentTime={currentTime}
                handleScrollVideoIntoView={handleScrollVideoIntoView}
              />
            </>
          </ConditionalWrapper>

          {/* Fake div to change DocumentTitle */}
          <div className="document-title">
            {(document.title = sessionData.title)}
          </div>

          <Chat
            data={sessionData}
            currentTime={currentTime}
            showChat={showChat}
          />

          <Footer
            videoDuration={sessionData.end}
            handlePlay={handlePlay}
            handlePause={handlePause}
            handlePlayPause={handlePlayPause}
            handleCurrentTime={handleCurrentTime}
            handleShare={handleShare}
            isPlaying={isPlaying}
            currentTime={currentTime}
            seekTo={seekTo}
            showChat={showChat}
            handleToggleComponents={handleToggleComponents}
            sessionData={sessionData}
          />
        </div>
      )}
    </div>
  );
}
