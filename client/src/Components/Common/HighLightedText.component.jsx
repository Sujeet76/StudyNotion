const HighLightedTextComponent = ({
  text,
  additionClass = "bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]",
}) => {
  return (
    <span className={`text-transparent bg-clip-text ${additionClass}`}>
      {text}
    </span>
  );
};

export default HighLightedTextComponent;
