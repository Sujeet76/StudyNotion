const NameLabel = ({ label, content, className }) => {
  return (
    <div className={className}>
      <p className="mb-2 text-sm text-richblack-600">{label}</p>
      <p className="text-sm font-medium text-richblack-5">{content}</p>
    </div>
  );
};

export default NameLabel;
