import React from "react";
export default function Loading() {
    return (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, top: 0, background: (0, 0, 0, 0.5), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={"spinner-border text-primary"} role="status">
                <span className={"sr-only"}>Loading...</span>
            </div>
        </div>
    )
}