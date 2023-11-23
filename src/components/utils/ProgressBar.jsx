const ProgressBar = ({ progress }) => {
    return (
      <div className="w-64 h-2 bg-gray-200 rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-green-500 rounded-full"
        ></div>
      </div>
    );
  };


export default ProgressBar;