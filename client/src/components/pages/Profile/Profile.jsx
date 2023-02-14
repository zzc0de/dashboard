import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask"
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as uiConstants from "../../../utils/constants/ui.constants";
import Modal from "../../UI/modal/Modal";
import AddButton from "../../UI/buttons/AddButton";
import ChangePassword from "../../form/change-password/ChangePassword";
import profileImage from "../../../assets/users/developer-profile.jpg"
import "../../form/forms.css";
import "./profile.css"
import { updateProfileInfo, getProfileInfo } from "../../../store/actions/usersActions";

export default function Profile() {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.auth.user);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [activeModal, setActiveModal] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    displayname: "",
    email: "",
    description: "",
    city: "",
    birthday: "",
    phone: "",
    work: {
      departament: "",
      workPhone: "",
      vocation: "",
    },
    avatar: "",
  });


  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      displayname: user.displayname,
      email: user.email,
      description: userInfo.description,
      city: userInfo.city,
      birthday: userInfo.birthday,
      phone: userInfo.phone,
      departament: userInfo.work.departament,
      workPhone: userInfo.work.phone,
      vocation: userInfo.work.vocation,
    }
  });

  useEffect(() => {
    dispatch(getProfileInfo(user.id))
  }, [user])

  const changePassword = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const onSubmit = (data) => {
    console.log(data)
    const updatedProfileInfo = {
      ...profileInfo,
      displayname: data.displayname,
      email: data.email,
      description: data.description,
      city: data.city,
      birthday: data.birthday,
      phone: data.phone,
      work: {
        departament: data.departament,
        workPhone: data.workPhone,
        vocation: data.vocation,
      },
    };
    dispatch(updateProfileInfo(updatedProfileInfo))
    reset();
  };

  const updateUserInfoHandler = () => {

  }

  return (
    <div className="profile">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__main-info">
          <div className="profile__image">
            <img src={profileImage} />
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.yourName}
            type="text"
            name="displayname"
            {...register("displayname", {
            
            })}
          />
          <div className="form-error">
            {errors.displayname && (
              <p>{errors.displayname.message || formConstants.unknownError}</p>
            )}
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.yourEmail}
            type="text"
            name="email"
            {...register("email", {
             
            })}
          />
          <div className="form-error">
            {errors.email && (
              <p>{errors.email.message || formConstants.unknownError}</p>
            )}
          </div>
          <Modal active={activeModal} close={closeModal}>
            <ChangePassword email={user.email} />
        </Modal>
        <div className="change-password">
        <Link to="#" onClick={changePassword}>Изменить пароль</Link>
        </div>
        </div>
        <div className="profile__additional-info">

        <textarea
            className="content-form__input"
            placeholder={formConstants.profileDescription}
            type="text"
            name="description"
            {...register("description", {
            
            })}
          />
          <div className="form-error">
            {errors.description && (
              <p>{errors.description.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.profileCity}
            type="text"
            name="city"
            {...register("city", {
            
            })}
          />
          <div className="form-error">
            {errors.city && (
              <p>{errors.city.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.profileBirthday}
            type="text"
            name="birthday"
            {...register("birthday", {
             
            })}
          />
          <div className="form-error">
            {errors.birthday && (
              <p>{errors.birthday.message || formConstants.unknownError}</p>
            )}
          </div>

          <InputMask
          className="content-form__input"
          placeholder={formConstants.profilePhone}
          as={InputMask}
          control={control}
          mask="+7(999)999-99-99"
          name="phone"
          {...register("phone", {
            // required: formConstants.requiredText,
          //   pattern: {
          //     value: REGEX.isValidDisplayName,
          //     message: formConstants.wrongDeviceNumber,
          // },
          })}
        />
          <div className="form-error">
            {errors.phone && (
              <p>{errors.phone.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.profileWorkDepartament}
            type="text"
            name="departament"
            {...register("departament", {
             
            })}
          />
          <div className="form-error">
            {errors.departament && (
              <p>{errors.departament.message || formConstants.unknownError}</p>
            )}
          </div>

          <InputMask
          className="content-form__input"
          placeholder={formConstants.profilePhone}
          as={InputMask}
          control={control}
          mask="+7(999)999-99-99"
          name="workPhone"
          {...register("workPhone", {
            // required: formConstants.requiredText,
          //   pattern: {
          //     value: REGEX.isValidDisplayName,
          //     message: formConstants.wrongDeviceNumber,
          // },
          })}
        />
          <div className="form-error">
            {errors.workPhone && (
              <p>{errors.workPhone.message || formConstants.unknownError}</p>
            )}
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.profileWorkVocation}
            type="text"
            name="vocation"
            {...register("vocation", {
             
            })}
          />
          <div className="form-error">
            {errors.vocation && (
              <p>{errors.vocation.message || formConstants.unknownError}</p>
            )}
          </div>
          <AddButton
          className={"submit-btn-small"}
          action={() => updateUserInfoHandler()}
          title={formConstants.save}
        />
        </div>
      </form>
      <div className="ext-info">
        fsfsfsdfs
      </div>
    </div>
  );
}
