const CardContent = ({ userPlayData, loses }) => {
  return (
    <div className="flex column">
      <div className="flex column">
        <div>
          <div className="Text bold">Game player</div>
          <div className="Text faded">
            <a
              href="https://github.com/Smolchenko"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Owner Github"
            >
              @irene_smolchenko
            </a>
          </div>
        </div>
        <div className="flex">
          <div className="flex">
            <div className="Text bold">{userPlayData.wins}</div>{" "}
            <div className="Text faded">Wins</div>
          </div>
          <div className="flex">
            <div className="Text bold">{loses}</div>{" "}
            <div className="Text faded">Loses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContent;
