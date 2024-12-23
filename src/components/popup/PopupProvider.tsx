import "./popupProvider.css";

interface PopupProps {
  children: React.ReactNode | React.ReactNode[];
}

const PopupProvider = ({ children }: PopupProps) => {
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ele = e.target as HTMLDivElement;
    if (ele.closest(".popup-toggle")) {
      e.currentTarget.querySelector(".popup")!.classList.toggle("show-up");
    }
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    e.currentTarget.querySelector(".popup")!.classList.remove("show-up");
  };

  return (
    <div
      className="popup-holder"
      onClick={onClickHandler}
      onBlur={onBlurHandler}
    >
      {children}
    </div>
  );
};

export default PopupProvider;
