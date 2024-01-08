import { useState } from "react";
import picture from "/Dr_Hanson.png?url";
import { useEffect } from "react";
import "./Home.css";
import apiUrl from "../../ApiConfig";
import Modal from "../../components/Modal";

export default function Home() {
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [licensesOpen, setLicensesOpen] = useState(false);
  const [certificationsOpen, setCertificationsOpen] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({});

  useEffect(() => {
    fetch(
      `${apiUrl}/updates`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status.code === 200) {
          setUpdates(data.data);
        } else {
          throw new Error(data.status.message);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  function setModale(update) {
    setUpdateInfo(update);
    setOpenModal(true);
  }

  return (
    <div
      className={`${
        openModal ? "overflow-hidden h-[88.5vh]" : ""
      } py-4 px-4 lg:px-64 w-full overflow-hidden`}
    >
      <div className="flex flex-col items-center">
        <img
          src={picture}
          alt="Dr. Suzan Hanson"
          className="rounded-full md:h-96 md:w-96"
        />

        <div className="w-full bg-green rounded-md py-2 md:py-5 px-5 mt-3 text-white">
          <h1 className="mb-5 font-bold text-center text-3xl md:text-4xl">
            Dr. Suzan Hanson
          </h1>
          <div className="flex justify-around">
            <div className="md:font-bold">
              <p className="md:text-xl">Family counselling</p>
              <p className="md:text-xl mt-3">Therapist</p>
            </div>

            <div className="md:font-bold">
              <p className="md:text-xl">Life coach</p>
              <p className="md:text-xl mt-3">Couple session</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 lg:mt-14">
        <h2 className="font-bold text-xl md:text-3xl cursor-pointer">
          Find me on Youtube
        </h2>
        <div className="lg:flex lg:justify-center">
          <div className="mt-2 lg:w-2/3">
            <div className="w-full relative overflow-hidden pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
                src="https://www.youtube.com/embed/dLaCqh56a0Y?si=L4v4m2uyFie8oLVj"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 lg:mt-14 overflow-y-hidden overflow-x-scroll">
        <h2 className="font-bold text-xl md:text-3xl cursor-pointer">
          Updates
        </h2>
        <div className="mt-2 flex w-fit">
          {updates.map((update) => (
            <div
              onClick={() => setModale(update)}
              key={update.id}
              className="cursor-pointer h-64 w-32 md:h-80 md:w-80 mr-2"
            >
              <div className="flex justify-center">
                <img
                  src={update.image}
                  className="h-32 object-cover md:h-48 md:w-48"
                  alt={update.title}
                />
              </div>
              <p className="font-bold text-xl text-center">{update.title}</p>
              <p className="clamp-4">{update.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 lg:mt-14">
        <h2
          onClick={() => setSpecialtiesOpen(!specialtiesOpen)}
          className="font-bold text-xl md:text-3xl cursor-pointer"
        >
          Specialties{" "}
          <i
            className={`fa-solid ${
              specialtiesOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </h2>

        <div
          className={`${
            specialtiesOpen ? "block" : "hidden"
          } mt-2 grid grid-cols-2 gap-4 lg:grid-cols-4`}
        >
          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Anxiety Management</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Attachment Styles</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Couples Counseling</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Divorce Recovery</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Grief & Loss</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Family Conflict</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">LGBT Counseling</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">School & Work Stress</p>
          </div>
        </div>
      </div>

      <div className="mt-5 lg:mt-14">
        <h2
          onClick={() => setEducationOpen(!educationOpen)}
          className="font-bold text-xl md:text-3xl cursor-pointer"
        >
          Education{" "}
          <i
            className={`fa-solid ${
              educationOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </h2>

        <div
          className={`${
            educationOpen ? "block" : "hidden"
          } mt-2 grid grid-cols-2 gap-4 lg:grid-cols-3`}
        >
          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Doctorate in Social Work</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Life Style Coach</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">
              Masters in Clinical Counseling Psychology, Benedictine University
            </p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">
              Illinois School Guidance Counselor K-12 PEL, DePaul University
            </p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">
              Post Graduate degree in School Counseling
            </p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">PEL Illinois School Counselor K-12</p>
          </div>
        </div>
      </div>

      <div className="mt-5 lg:mt-14">
        <h2
          onClick={() => setLicensesOpen(!licensesOpen)}
          className="font-bold text-xl md:text-3xl cursor-pointer"
        >
          Licenses{" "}
          <i
            className={`fa-solid ${
              licensesOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </h2>

        <div
          className={`${
            licensesOpen ? "block" : "hidden"
          } mt-2 grid grid-cols-2 gap-4 lg:grid-cols-4`}
        >
          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Doctorate in Social Work</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Licensed Professional Counselor</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">
              Licensed Clinical Professional Counselor
            </p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Illinois School Counseling K-12 PEL</p>
          </div>
        </div>
      </div>

      <div className="mt-5 lg:mt-14">
        <h2
          onClick={() => setCertificationsOpen(!certificationsOpen)}
          className="font-bold text-xl md:text-3xl cursor-pointer"
        >
          Certifications{" "}
          <i
            className={`fa-solid ${
              certificationsOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </h2>

        <div
          className={`${
            certificationsOpen ? "block" : "hidden"
          } mt-2 grid grid-cols-2 gap-4 lg:grid-cols-4`}
        >
          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">
              Red Cross Disaster & Mental Health Service Certificate
            </p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">
              Divorce and Family Mediation, DePaul University
            </p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Yoga Instructor</p>
          </div>

          <div className="p-2 bg-beige rounded-md flex justify-center items-center">
            <p className="text-center">Life Coach</p>
          </div>
        </div>
      </div>

      <Modal open={openModal} closeModal={setOpenModal}>
        <img className="w-full h-[40rem] object-cover" src={updateInfo.image} alt={updateInfo.title} />
        <p className="font-bold text-2xl text-center mb-5">
          {updateInfo.title}
        </p>
        <p>{updateInfo.content}</p>
      </Modal>
    </div>
  );
}
