# Hot Seat

## Check it Out!

[hot-seat.netlify.app/](https://hot-seat.netlify.app/)

## Overview

Hot Seat is both a dashboard of a Machine Learning model that predicts the the likelihood of each NFL head coach being fired and engine for predicting next season's outcomes with real-time model integration. What's more, the historical training data for the model is included and visualized for each coach from the past 30 years (1996-2025).

## Key Features:

- Integrated Machine Learning prediction engine hosted on Render and callable from user inputs
- Fully integrated backend with Supabase, dynamically calling SQL tables to load based on user input of filter criteria
- Graph.js interactive visualizations for the historical data of each coach
- Hosted on Netlify to manage frontend requests

### Technologies Used

#### Frontend:

- React + TypeScript
- TailwindCSS
- Graph.js
- Astro Supabase starter

#### Backend:

- Machine Learning model hosted on Render
- Scikit-learn for the Machine Learning model in Python
- Jupyter Notebooks with scrapers from Pro Football Reference for historical data

#### Database:

- Supabase for SQL storage

## Next Steps:

### Model features

- Sentiment analysis of local media to gauge public perception of coach
- Count of how many different QBs started games for that coach within a season, and/or within their tenure
- Duration of tenure of preceding coach
- h2h record against division rivals

### Site features

- Unique image for each coach, each season
- Historical logos for older seasons
- Within coach row dropdown, enable bar chart plotting of other features against heat
- Within coach row trophy case, have h2h against division rivals
