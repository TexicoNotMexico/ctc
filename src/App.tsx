import CTCSketch from "./CTCSketch";

const App = () => {
    function handleContextMenu(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }
    return (
        <div onContextMenu={handleContextMenu}>
            <CTCSketch />
        </div>
    );
};

export default App;
