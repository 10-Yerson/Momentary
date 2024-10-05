// src/components/ProfileHighlights.jsx
const ProfileHighlights = () => (
    <div className="flex space-x-4 mt-6">
      {[
        "https://storage.googleapis.com/a1aa/image/HpihU6S6DNIXBpz0MFeihACIy1atFxfJirlV1YrxUHuqgzjTA.jpg",
        "https://storage.googleapis.com/a1aa/image/hpjp9h32G7rpOR5WOgdPhAPjle7acjWTcsCkgmXROHoVw5xJA.jpg",
        "https://storage.googleapis.com/a1aa/image/PHjFBo6HI3b7BVHbmu3V3ii92QAqVT0SBZ2DFS7OpyGJ484E.jpg",
        "https://storage.googleapis.com/a1aa/image/Mog87vuirD7YBZ6NaCeFTrwbtWIDIpYx2NTZkYmffJ4KBnHnA.jpg"
      ].map((src, index) => (
        <div className="highlight" key={index}>
          <img alt={`Highlight ${index + 1}`} height="70" src={src} width="70" />
        </div>
      ))}
    </div>
  );
  
  export default ProfileHighlights;
  