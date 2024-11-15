// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <button className="back-button">←</button>
        <h1 className="header-title">DL-0212</h1>
        <nav className="header-tabs">
          <span className="tab">Summary</span>
          <span className="tab active">
            Defects <span className="badge">5</span>
          </span>
          <span className="tab">AI Chat</span>
          <span className="tab">Timeline</span>
          <span className="tab">Previous Judgements</span>
          <span className="tab">
            Uploaded documents <span className="badge">2</span>
          </span>
        </nav>
      </div>
      <div className="header-right">
        <button className="upload-button">+ Upload new document</button>
        {/* <div className="icon question-icon">?</div>
        <div className="icon user-icon">◑</div>
        <div className="icon profile-icon">👤</div> */}
      </div>
    </div>
  );
};

export default Header;
