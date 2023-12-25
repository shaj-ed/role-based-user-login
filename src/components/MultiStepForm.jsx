import { useContext, useEffect, useState } from "react";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";
import TimestampInput from "./TimestampInput";
import FileInput from "./FileInput";
import SentTo from "./SentTo";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { UserContext } from "../context/UserContext";

const MultiStepForm = () => {
  const { newUser, loading, addContactList } = useContext(UserContext);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [file, setFile] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [selectUserDetail, setSelectUserDetail] = useState("");
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    if (!loading) {
      setName("");
      setNumber("");
      setTimestamp("");
      setFile("");
      setSelectUser("");
      setSelectUserDetail("");
      setStepIndex(0);
      setError({
        isError: false,
        message: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.files[0].type !== "audio/mpeg") {
        setError({
          isError: true,
          message: "File must be mp3",
        });
      } else {
        setError({
          isError: false,
          message: "",
        });
        setFile(e.target.files[0]);
      }
    }
  };

  const { stepIndex, step, lastStep, setStepIndex, prevStep, nextStep } =
    useMultistepForm([
      <NameInput name={name} setName={setName} key={Math.random()} />,
      <PhoneInput number={number} setNumber={setNumber} key={Math.random()} />,
      <TimestampInput
        timestamp={timestamp}
        setTimestamp={setTimestamp}
        key={Math.random()}
      />,
      <FileInput
        file={file}
        handleFileChange={handleFileChange}
        key={Math.random()}
      />,
      <SentTo
        setSelectUserDetail={setSelectUserDetail}
        selectUser={selectUser}
        setSelectUser={setSelectUser}
        key={Math.random()}
      />,
    ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number || !timestamp || !file || !selectUser) {
      setError({
        isError: true,
        message: `Field Can't be empty`,
      });
    } else {
      const meetingDetails = {
        name,
        number,
        timestamp,
        sentUser: selectUserDetail,
        createdBy: newUser.name,
      };

      addContactList(meetingDetails, file, selectUserDetail.id);
    }
  };

  return (
    <form className="w-full px-3 max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
      <span className="font-bold text-md text-red-400 mb-2">
        {error.isError && error.message}
      </span>

      {step}

      <div className="mt-8 w-full text-right">
        <button
          type="button"
          className="text-md font-semibold px-7 py-2 mr-2 bg-slate-700 text-slate-50 cursor-pointer hover:opacity-90"
          onClick={prevStep}
          disabled={stepIndex === 0 ? true : false || loading}
        >
          Prev
        </button>

        {stepIndex !== lastStep && (
          <button
            type="button"
            className="text-md font-semibold px-7 py-2 bg-slate-700 text-slate-50 cursor-pointer hover:opacity-90"
            onClick={nextStep}
          >
            Next
          </button>
        )}

        {stepIndex === lastStep && (
          <button
            type="submit"
            className="text-md font-semibold px-7 py-2 bg-slate-700 text-slate-50 cursor-pointer hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Loading.." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
