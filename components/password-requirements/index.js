import styles from "./styles.module.scss";
import checkIcon from "../../public/check-icon.svg";
import Image from "next/image";

export default function PasswordRequirements(props) {
  return (
    <ul className={styles.passwordRequirementsList}>
      <li className={styles.passwordRequirementsItem}>
        <span className={styles.checkbox}>
          <Image
            className={props.requirements.min ? styles.checkmark : "d-none"}
            src={checkIcon}
            fill
            alt="check-icon"
          />
        </span>
        <label className={styles.passwordRequirementsLabel}>
          Be minimum of 8 characters in length
        </label>
      </li>
      <li className={styles.passwordRequirementsItem}>
        <span className={styles.checkbox}>
          <Image
            className={props.requirements.special ? styles.checkmark : "d-none"}
            src={checkIcon}
            fill
            alt="check-icon"
          />
        </span>

        <label className={styles.passwordRequirementsLabel}>
          At least one Special character
        </label>
      </li>
      <li className={styles.passwordRequirementsItem}>
        <span className={styles.checkbox}>
          <Image
            className={
              props.requirements.uppercase ? styles.checkmark : "d-none"
            }
            src={checkIcon}
            fill
            alt="check-icon"
          />
        </span>

        <label className={styles.passwordRequirementsLabel}>
          At least one Uppercase letter
        </label>
      </li>
      <li className={styles.passwordRequirementsItem}>
        <span className={styles.checkbox}>
          <Image
            className={
              props.requirements.lowercase ? styles.checkmark : "d-none"
            }
            src={checkIcon}
            fill
            alt="check-icon"
          />
        </span>

        <label className={styles.passwordRequirementsLabel}>
          At least one Lowercase letter
        </label>
      </li>
      <li className={styles.passwordRequirementsItem}>
        <span className={styles.checkbox}>
          <Image
            className={props.requirements.number ? styles.checkmark : "d-none"}
            src={checkIcon}
            fill
            alt="check-icon"
          />
        </span>

        <label className={styles.passwordRequirementsLabel}>
          At least one Number letter
        </label>
      </li>
    </ul>
  );
}
