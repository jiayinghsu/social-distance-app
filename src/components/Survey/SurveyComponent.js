import React, {Component} from "react";
import * as Survey from "survey-react";
import "survey-react/modern.css";
import {Link} from 'react-router-dom';
import styled from "styled-components";

Survey.StylesManager.applyTheme("modern");
const StyledSurvey = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  
  font-family: Raleway;
  
  > article {
    margin: 0 auto;
    padding: 100px 0 0 0;
    top: 0;
    bottom: 0;
    width: min(80%, 600px);
    
    .left {
        padding-left: 0;
        padding-right: 100px;
    }
    > div {
        overflow-x: hidden;
    }
 
    p { text-align: left; }
  }
`;

const StyledButton = styled(Link)`
    font-weight: 900;
    
    display: inline-block;
    text-decoration: none;
    user-select: none;
    cursor: pointer;
    
    right: 0;
    
    border: solid 2px transparent;
    border-radius: 24px;
    
    padding: 7px 18px;
    line-height: 1.7em;
    
    color: #23aaff;
    background-color: #fafafa;
    
    &:hover, &:focus {
        outline:none;
        border: solid 2px #23aaff;
    }
    &:active {
        color: white;
        background-color: #23aaff;
    }
    
 }
`;

class SurveyComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onCompleteComponent = this.onCompleteComponent.bind(this)
    }

    onCompleteComponent = () => {
        this.setState({
            isCompleted: true
        })
    }

    render() {
        const json = {
            checkErrorsMode: "onValueChanged",
            showQuestionNumbers: "off",
            pages: [
                {
                    name: "page1",
                    elements: [
                        {
                            type: "matrixdynamic",
                            name: "orderList",
                            rowCount: 15,
                            minRowCount: 1,
                            title: "Social Distance Questionnaire",
                            description: "Imagine a list of at least 15 people closest to you in the world ranging from your dearest friend or relative at position #1 to an acquaintance or a competitor at #15. The person at #1 would be someone you know well and is your closest friend or relative. " +
                                "The person at #15 might be someone you recognize and encounter but perhaps you may not even know their name.",
                            detailPanelMode: "underRow",
                            addRowText: "Add a person",
                            removeRowText: "Remove",
                            columns: [
                                {
                                    name: "id",
                                    title: "Rank",
                                    cellType: "expression",
                                    expression: "{rowIndex}"
                                },
                                {
                                    name: "Name",
                                    title: "Name",
                                    cellType: "text",
                                    isRequired: true
                                },
                                {
                                    name: "relativeType",
                                    title: "Relations",
                                    cellType: "dropdown",
                                    isRequired: true,
                                    choices: [
                                        "Kin relations",
                                        "Spouses",
                                        "Close friends",
                                        "Acquaintances",
                                        "Competitor",
                                        "Enemy",
                                        "Other (Please specify)"
                                    ]
                                },
                                {
                                    name: "Other",
                                    title: "Other",
                                    cellType: "text",
                                    isRequired: false
                                }
                            ],
                        }
                    ]
                }
            ]
        };
        const survey = new Survey.Model(json);
        const surveyRender = !this.state.isCompleted ? (
            <Survey.Survey
                json={json}
                showCompletedPage={false}
                onComplete={this.onCompleteComponent}
            />
        ) : null
        const onSurveyCompletion = this.state.isCompleted ? (
            <StyledSurvey>
                <article>
                    <h1>Instruction</h1>
                    <p>
                        In the next section, you will need to complete the welfare tradeoff task with the persons you
                        just filled in the survey.
                        This process takes about 40-50 minutes. Please click "Continue" when you are ready.
                    </p>
                    <StyledButton to='/slider' style={{marginTop: "25px"}}>Continue</StyledButton>
                </article>
            </StyledSurvey>

        ) : null
        return (
            //<Survey.Survey model={survey}/>
            <>
                {surveyRender}
                {onSurveyCompletion}
            </>

        );
    }
}

export default SurveyComponent;
