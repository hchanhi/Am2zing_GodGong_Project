const DiaryButton = ({ text, type, onClick }) => {
    return (
        <button className={['DiaryButton', `DiaryButton_${type}`].join(" ")} onClick={onClick}>

            {text}
        </button>
    );
};

DiaryButton.defaultProps = {
    type: 'default'
};
export default DiaryButton;