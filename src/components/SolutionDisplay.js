import '../index.css';

function SolutionButton(props){
    return(
        <button className="solution_button" onClick={() => props.onClick()}>
            Solution {props.index}
        </button>
        )
}

export default function SolutionDisplay(props) {
    
    function createButton(i) {
        return(
        <SolutionButton key={i} index={i+1} onClick={() => props.onClick(i)} />
        );
    }
    
    var buttons = [];
    for (let i = 0; i < props.numberOfSolutions; i++) {
        buttons.push(createButton(i));
    }

    return(
        buttons
    );
}

