/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const FileInput = ({ file, handleFileChange }) => {
  return (
    <label>
      <span className="block text-md font-semibold mb-2">Choose a mp3</span>
      <div className="relative overflow-hidden">
        <input
          type="file"
          className="file-input file-input-bordered  border-solid border-2 border-slate-600 font-semibold text-md outline-none w-full"
          onChange={handleFileChange}
        />
        <span className="text-md font-semibold mt-4 block absolute top-[-0.2rem] left-[8rem] w-max">
          {file.name && file.name}
        </span>
      </div>
    </label>
  );
};

export default FileInput;
