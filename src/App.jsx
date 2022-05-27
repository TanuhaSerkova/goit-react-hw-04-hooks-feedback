import React, { useState } from 'react';
import { Section } from './components/Section/Section'
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from './components/Notification/Notification';
import { Statistics } from 'components/Statistics/Statistics';

export const App = () => {
    const [options, setOptions] = useState({
        good: 0, neutral: 0, bad: 0
    });

    const handleFeedbackChange = key => {
        setOptions(options => ({ ...options, [key]: options[key] + 1 }));
    };

    /*const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    /*const handleFeedbackChange = feedback => {
        switch (feedback) {
            case 'good':
                setGood(prevState => prevState + 1);
                break;
            
            case 'neutral':
                setNeutral(prevState => prevState + 1);
                break;
            
            case 'bad':
                setBad(prevState => prevState + 1);
                break;
            
            default:
                break;
        }
    };*/

    const countTotalFeedback = () => {
        return options.good + options.neutral + options.bad;
    };

    const countPositiveFeedbackPercentage = () => {
        const total = countTotalFeedback();
        return Math.round((options.good * 100) / total);
    };

    const keys = ['good', 'neutral', 'bad']; 

    return (
        <>
            <Section title="Please leave feedback">
                <FeedbackOptions
                    options={keys}
                    onBtnClick={handleFeedbackChange}
                />
            </Section>
            <Section title="Statistics">
                {countTotalFeedback() > 0 ? (
                    <Statistics
                        good={options.good}
                        neutral={options.neutral}
                        bad={options.bad}
                        total={countTotalFeedback()}
                        positivePercentage={countPositiveFeedbackPercentage()}
                    />
                ) : (
                    <Notification message='Thereis no feedback' />
                )}  
            </Section>
        </>
    );
}