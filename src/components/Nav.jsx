import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export default function Nav({
  setLibraryOpen,
}) {
  return (
    <>
      <nav>
        <h1>Waves</h1>
        <button
          onClick={() =>
            setLibraryOpen(
              (open) => !open
            )
          }
        >
          Library{" "}
          <FontAwesomeIcon
            icon={faMusic}
          />
        </button>
      </nav>
    </>
  );
}
