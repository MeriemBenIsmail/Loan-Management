import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import "./loanApplication.css";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../firebase/index";
import { ref, uploadBytes } from "firebase/storage";

const LoanApplication = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cin, setCin] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [address, setAddress] = useState();
  const [job, setJob] = useState();
  const [age, setAge] = useState();
  const [salary, setSalary] = useState();
  const [bankStatement, setBankStatement] = useState();
  const [insuranceProof, setInsuranceProof] = useState();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user);
        setCurrentUser(user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  const addLoanApp = async (e) => {
    e.preventDefault();

    const formData = {
      cin: cin,
      email: currentUser.email,
      firstname: firstname,
      lastname: lastname,
      address: address,
      job: job,
      age: age,
      salary: salary,
    };
    await setDoc(doc(db, "Client", cin), formData);
    // store the uploaded documents
    const bankStatementRef = ref(storage, `loan_files/bank-${lastname + cin}`);
    uploadBytes(bankStatementRef, bankStatement).then(() => {
      alert("bank statement uploaded");
    });
    const insuranceProofRef = ref(
      storage,
      `loan_files/insurance-${lastname + cin}`
    );
    uploadBytes(insuranceProofRef, insuranceProof).then(() => {
      alert("insurance proof uploaded");
    });
    setSuccess(true);
  };
  return (
    <div className="wrapper">
      {success && (
        <div
          class="alert alert-success"
          role="alert"
          style={{ marginRight: "50px" }}
        >
          The loan application is sent successfully !
        </div>
      )}
      <div className="formContainerLoan">
        <h3 style={{ color: "#1E1E1EB0" }}>Apply For A Loan</h3>

        <form>
          <div class="form-group">
            <label>cin</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter cin"
              onChange={(e) => setCin(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Firstname</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Lastname</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Address</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Job</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Job"
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Age</label>
            <input
              type="number"
              class="form-control"
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Salary</label>
            <input
              type="number"
              class="form-control"
              placeholder="Enter Salary"
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlFile1">Bank Statements</label>

            <input
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
              onChange={(e) => setBankStatement(e.target.files)}
            />
          </div>
          <div class="form-group">
            <label
              for="exampleFormControlFile1"
              onChange={(e) => setInsuranceProof(e.target.files)}
            >
              Insurance Proof
            </label>

            <input
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary submit"
            onClick={addLoanApp}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplication;
