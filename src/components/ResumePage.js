import React, {useState} from "react";
import Resume from "./Resume";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import AdminPanel from "./AdminPanel";
import {useMediaQuery} from "react-responsive";

function ResumePage() {
    const [resumeData, setResumeData] = useState({});
    const [adminPanel, setAdminPanel] = useState(false);
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});

    if (!adminPanel) return <Resume
        resumeData={resumeData}
        setResumeData={setResumeData}
        toggleAdminPanel={() => setAdminPanel(!adminPanel)}
    />;
    if (isMobile) {
        return adminPanel
            ? <AdminPanel
                resumeData={resumeData}
                setResumeData={setResumeData}
                toggleAdminPanel={() => setAdminPanel(!adminPanel)}/>
            : <Resume
                resumeData={resumeData}
                setResumeData={setResumeData}
                toggleAdminPanel={() => setAdminPanel(!adminPanel)}/>
    }
    return (
        <PanelGroup autoSaveId="ResumePageWrapperPanelGroup" direction={"horizontal"}>
            <Panel>
                <Resume
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    toggleAdminPanel={() => setAdminPanel(!adminPanel)}
                />
            </Panel>
            <PanelResizeHandle/>
            <Panel>
                <AdminPanel
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    toggleAdminPanel={() => setAdminPanel(!adminPanel)}
                />
            </Panel>
        </PanelGroup>
    )
}

export default ResumePage;