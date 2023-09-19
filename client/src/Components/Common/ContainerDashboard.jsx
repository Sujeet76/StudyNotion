const ContainerDashboard = ({ children, className }) => {
  return (
    <div
      className={`bg-richblack-800 border border-richblack-700 rounded-lg lg:py-8 lg:px-12 px-4 py-8 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerDashboard;
