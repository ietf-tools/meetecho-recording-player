import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Import Panels components
import Info from "./info";
import TranscriptsList from "./transcripts/transcripts-list";
import IFrame from "./i-frame";
import PollsList from "./polls/polls-list";

// Import CSS styles
//import "react-tabs/style/react-tabs.css";
import "./panels.scss";

function Panels({
  showChat,
  handleCurrentTime,
  seekTo,
  data = {},
  currentTime,
  handleScrollVideoIntoView,
}) {
  // Storing the available panels into a variable
  const panelsAvailable = data.panels ?? [];

  // Create a function that iterates and switch panel depending on the "type" property, it will return the JSX code to render
  const switchPanels = () => {
    let JSX;

    for (const panel of panelsAvailable) {
      switch (panel.type) {
        case 0:
          JSX = (
            <>
              {JSX}
              <TabPanel>
                <TranscriptsList
                  handleCurrentTime={handleCurrentTime}
                  seekTo={seekTo}
                  currentTime={currentTime}
                  handleScrollVideoIntoView={handleScrollVideoIntoView}
                />
              </TabPanel>
            </>
          );
          break;
        case 1:
          JSX = (
            <>
              {JSX}
              <TabPanel>
                <IFrame link={panel.link} />
              </TabPanel>
            </>
          );
          break;
        case 2:
          JSX = (
            <>
              {JSX}
              <TabPanel>
                <Info data={panel.data} />
              </TabPanel>
            </>
          );
          break;
        case 3:
          JSX = (
            <>
              {JSX}
              <TabPanel>
                <PollsList
                  handleCurrentTime={handleCurrentTime}
                  seekTo={seekTo}
                  currentTime={currentTime}
                  handleScrollVideoIntoView={handleScrollVideoIntoView}
                />
              </TabPanel>
            </>
          );
          break;
        default:
          continue;
      }
    }

    return JSX;
  };

  // store the returning JSX from the switchPanels function to a variable to inject into the Return
  const panelsToShow = switchPanels();

  return (
    <section
      className={
        showChat
          ? "Panels section--wrapper d-none"
          : "Panels section--wrapper d-unset"
      }
    >
      <Tabs>
        <TabList>
          {panelsAvailable.map((panel, i) => {
            return <Tab key={i}>{panel.title}</Tab>;
          })}
        </TabList>

        {panelsToShow}
      </Tabs>
    </section>
  );
}

export default Panels;
