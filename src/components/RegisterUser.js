import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from "react";
import states from "../backend/model/states";
import { addUserToFirestore } from "../backend/api";
import { Link } from 'react-router-dom';
const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.string().required(),
    sex: yup.string().required(),
    mobile: yup.string().matches(/^[6789]\d{9}$/, {
        message: 'Invalid mobile number, Enter 10 digit mobile number only',
        excludeEmptyString: true
    }),
    idType: yup.string(),
    govtId: yup.string().when('idType', {
        is: 'aadhar',
        then: () => yup.string().matches(/^\d{12}$/, 'Invalid Aadhar number'),
        otherwise: () => yup.string().matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, {
            message: 'Invalid PAN number',
            excludeEmptyString: true
        })
    }),
    guardianDetails: yup.object().shape({
        title: yup.string().when('name', {
            is: (name) => !!name,
            then: () => yup.string().required('Title is required when Guardian name is present'),
            otherwise: () => yup.string()
        }),
        name: yup.string(),
        email: yup.string().email(),
        emergencyContact: yup.string().matches(/^[6789]\d{9}$/, {
            message: 'Invalid emergency contact number',
            excludeEmptyString: true
        })
    }),
    address: yup.object().shape({
        addressLine: yup.string(),
        state: yup.string(),
        city: yup.string(),
        pincode: yup.string(),
        country: yup.string().equals(['India'])
    }),
    occupation: yup.string(),
    religion: yup.string(),
    maritalStatus: yup.string(),
    bloodGroup: yup.string(),
    nationality: yup.string().equals(['India'])
});

export const AddUserForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [selectedState, setSelectedState] = useState("");

    const onSubmit = (data) => {
        addUserToFirestore(data).then(() => {
            alert("User added successfully");
            reset();
        }).catch((err) => {
            alert("Error: ", err.message);
        });
    };

    const stateOptions = states.map((state) => <option key={state.code} value={state.name}>{state.name}</option>);

    const cityOptions = (state) => {
        if (state !== "") {
            const cities = states.find((s) => s.name === state).cities;
            return cities.map((city) => <option key={city} value={city}>{city}</option>);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                    <p className="fw-bold mt-2"><u>Personal Details</u></p>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="mb-3 d-flex justify-content-between">
                                <label htmlFor="name" className="me-3 mt-1 ">Name<span className="text-danger">*</span></label>
                                <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register("name")} placeholder="Enter Name" />
                                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                            </div>
                            <div className="d-flex justify-content-between">
                                <label htmlFor="mobile" className="me-3 mt-1">Mobile</label>
                                <input type="tel" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} {...register("mobile")} placeholder="Enter Mobile" />
                                {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-7">
                                    <div className="mb-3 d-flex justify-content-between">
                                        <label htmlFor="age" className="me-3">Date of Birth<span className="text-danger">*</span></label>
                                        <input type="date" className={`form-control ${errors.age ? 'is-invalid' : ''}`} {...register("age")} />
                                        {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="mb-3 d-flex justify-content-between">
                                        <label htmlFor="sex" className="me-3 mt-1">Sex<span className="text-danger">*</span></label>
                                        <select className={`form-select form-control ${errors.sex ? 'is-invalid' : ''}`} {...register("sex")}>
                                            <option value="">Enter sex</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                        {errors.sex && <div className="invalid-feedback">{errors.sex.message}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="idType" className="me-3">Govt Issued ID</label>
                                        <select className={`form-select form-control ${errors.idType ? 'is-invalid' : ''}`} {...register("idType")}>
                                            <option value="">ID Type</option>
                                            <option value="Aadhar">Aadhar</option>
                                            <option value="Pan">PAN</option>
                                        </select>
                                        {errors.idType && <div className="invalid-feedback">{errors.idType.message}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className="form-group">
                                        <input type="text" className={`form-control ${errors.govtId ? 'is-invalid' : ''}`} {...register("govtId")} placeholder="Enter Govt ID" />
                                        {errors.govtId && <div className="invalid-feedback">{errors.govtId.message}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="fw-bold mt-2"><u>Contact Details</u></p>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="d-flex justify-content-between">
                                <div className="col-sm-2">
                                    <label htmlFor="Guardian Details" className="me-3">Guardian Details</label>
                                </div>
                                <div className="col-sm-3">
                                    <select className="form-select form-control me-3 mt-1" {...register("guardianDetails.title")}>
                                        <option value="">Enter Label</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Ms.">Ms.</option>
                                        <option value="Miss.">Miss.</option>
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    {/* <input type="text" className="form-control mt-1" placeholder="Enter Guardian Name" {...register("guardianDetails.name")} /> */}
                                    <input type="text" className={`form-control mt-1 ${errors.guardianDetails?.name && errors.guardianDetails.name !== '' ? 'is-invalid' : ''}`} placeholder="Enter Guardian Name" {...register("guardianDetails.name", { required: 'Guardian Title is required' })} />
                                    {errors.guardianDetails?.name?.type === 'required' && <div className="invalid-feedback">{errors.guardianDetails.name.message}</div>}
                                    {errors.guardianDetails?.title && <div className="invalid-feedback">{errors.guardianDetails.title.message}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="Guardian Email" className="me-3 mt-1">Email</label>
                                        <input type="email" className="form-control" placeholder="Email" {...register("guardianDetails.email")} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="Guardian Email" className="me-3">Emergency Contact Number</label>
                                        <input type="tel" className={`form-control ${errors.guardianDetails?.emergencyContact ? 'is-invalid' : ''}`} placeholder="Enter Emergency Number" {...register("guardianDetails.emergencyContact")} />
                                        {errors.guardianDetails?.emergencyContact && <div className="invalid-feedback">{errors.guardianDetails.emergencyContact.message}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="fw-bold mt-2"><u>Address Details</u></p>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="mb-3 d-flex justify-content-between">
                                <label htmlFor="addressDetails" className="me-3 mt-1">Address</label>
                                <input type="text" className={`form-control ${errors.address?.addressLine ? 'is-invalid' : ''}`} {...register("address.addressLine")} />
                                {errors.address?.addressLine && <div className="invalid-feedback">{errors.address.addressLine.message}</div>}
                            </div>
                            <div className="d-flex justify-content-between">
                                <label htmlFor="Country" className="me-3 mt-1">Country</label>
                                <select className="form-select form-control me-5" {...register("address.country")}>
                                    <option value="India">India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="mb-3 d-flex justify-content-between">
                                        <label htmlFor="state" className="me-3 mt-1">State</label>
                                        <select className={`form-select form-control ${errors.address?.state ? 'is-invalid' : ''}`} {...register("address.state")} value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                                            <option value="">Select state</option>
                                            {stateOptions}
                                        </select>
                                        {errors.address?.state && <div className="invalid-feedback">{errors.address.state.message}</div>}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="pincode" className="me-3 mt-1">Pincode</label>
                                        <input type="text" className={`form-control ${errors.address?.pincode ? 'is-invalid' : ''}`} {...register("address.pincode")} />
                                        {errors.address?.pincode && <div className="invalid-feedback">{errors.address.pincode.message}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-3 d-flex justify-content-between">
                                        <label htmlFor="city" className="me-3 mt-1">City</label>
                                        <select className={`form-select form-control ${errors.address?.city ? 'is-invalid' : ''}`} {...register("address.city")}>
                                            <option value="">Select city</option>
                                            {cityOptions(selectedState)}
                                        </select>
                                        {errors.address?.city && <div className="invalid-feedback">{errors.address.city.message}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="fw-bold mt-2"><u>Other Details</u></p>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="occupation" className="me-3 mt-1">Occupation</label>
                                <input type="text" className="form-control" {...register("occupation")} />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="religion" className="me-3 mt-1">Religion</label>
                                <select className="form-select form-control" {...register("religion")}>
                                    <option value="">Enter Religion</option>
                                    <option value="Hinduism">Hinduism</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Christianity">Christianity</option>
                                    <option value="Sikhism">Sikhism</option>
                                    <option value="Buddhism">Buddhism</option>
                                    <option value="Jainism">Jainism</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="maritalStatus" className="me-3 mt-1">Marital Status</label>
                                <select className="form-select form-control" {...register("maritalStatus")}>
                                    <option value="">Enter Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="bloodGroup" className="me-3 mt-1">Blood Group</label>
                                <select className="form-select form-control" {...register("bloodGroup")}>
                                    <option value="">Enter Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="nationality" className="me-3 mt-1">Nationality</label>
                                <select className="form-select form-control" {...register("nationality")}>
                                    <option value="India">India</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between float-end">
                        <Link to="/" className="btn btn-danger me-4 mb-2">Cancel</Link>
                        <button type="submit" className="btn btn-success me-3 mb-2">Submit</button>
                    </div>
                </form>
            </div>
        </>

    )
}
