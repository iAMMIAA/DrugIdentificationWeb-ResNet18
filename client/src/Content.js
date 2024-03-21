// Content.js
import React from 'react';

function Content({ page }) {
  let content = null;

  switch (page) {
    case 'home':
      content = <div>Home Page Content</div>;
      break;
    case 'settings':
      content = <div>Settings Page Content</div>;
      break;
    case 'about':
      content = <div>About Page Content</div>;
      break;
    default:
      content = <div>Choose a page from the sidebar</div>;
  }

  return (
    <main>
      {content}
    </main>
  );
}

export default Content;
