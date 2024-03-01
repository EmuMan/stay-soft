import { Stack, Typography, TextField, Button } from "@mui/material";

import QuestionForm from "./QuestionForm";

const CreatePage = (props) => {
  return (
    <QuestionForm handleSubmit={handleSubmit} />
  );

  function handleSubmit(subPrompt) {
    console.log("we making the new prompt. heres what arrived");
    console.log(subPrompt);
    var curDate = new Date();
    var day = String(curDate.getDate()).padStart(2, '0');
    var month = String(curDate.getMonth() + 1).padStart(2, '0');
    var year = curDate.getFullYear();

    curDate = month + '/' + day + '/' + year;
    const prompt = {
      description: subPrompt.question,
      dateOpened: curDate,
      dateClosed: subPrompt.dateClosed,
      category: subPrompt.category,
      creator: "New Gamer",
      yesCount: 0,
      noCount: 0
    }
    
    console.log("we adding the new stuff to the old stuff. heres the new stuff");
    console.log(prompt);
    props.updateList(prompt);
  }
};

export default CreatePage;
