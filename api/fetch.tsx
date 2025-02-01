// import { useState } from "react";

// const PredictForm = () => {
//   // Example state to store the form inputs
//   const [inputs, setInputs] = useState({
//     feature1: 3,
//     feature2: 2.0,
//     feature3: 4,
//     feature4: 7,
//     feature5: 4,
//     feature6: 0.5,
//     feature7: -3,
//     feature8: 2,
//     feature9: 0.2,
//     feature10: 2.5,
//     feature11: 1,
//     feature12: 1,
//     feature13: 0.2,
//     feature14: 1,
//     feature15: 0.307,
//     feature16: 0.19,
//     feature17: 0.307,
//     feature18: 0,
//     feature19: 0,
//     feature20: 0,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setInputs({
//       ...inputs,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEventHandler<HTMLFormElement>) => {
//     e.preventDefault();

//     const featureArray = Object.values(inputs); // Create array of features

//     const response = await fetch(
//       "https://hot-seat-backend.onrender.com/predict",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ features: featureArray }),
//       }
//     );

//     const result = await response.json();
//     console.log(result);
//     // Handle the result (e.g., update UI with prediction)
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Dynamic form inputs */}
//       {Object.keys(inputs).map((feature, index) => (
//         <div key={index}>
//           <label htmlFor={feature}>{feature}:</label>
//           <input
//             type="number"
//             id={feature}
//             name={feature}
//             value={inputs[feature]}
//             onChange={handleChange}
//           />
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PredictForm;
