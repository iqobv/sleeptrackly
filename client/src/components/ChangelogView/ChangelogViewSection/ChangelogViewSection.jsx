import { useEffect, useState } from "react";

import styles from "./ChangelogViewSection.module.scss";

const ChangelogViewSection = ({ data, section }) => {
  const [show, setShow] = useState(true);
  const [hasSummary, setHasSummary] = useState(false);
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    if (data) {
      setHasSummary(!!data?.summary);
      setHasItems(data?.items?.length > 0);
    }
  }, [data]);

  useEffect(() => {
    hasSummary || hasItems ? setShow(true) : setShow(false);
  }, [hasSummary, hasItems]);

  if (!show) return null;

  return (
    <>
      <div>
        {section && <p>{section.charAt(0).toUpperCase() + section.slice(1)}</p>}
        {data?.summary && (
          <div className={styles["changelog-summary"]}>{data.summary}</div>
        )}
        {data?.items && data?.items.length > 0 && (
          <ul className={styles["changelog-items"]}>
            {data.items.map((item) => (
              <li key={item} className={styles["changelog-item"]}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ChangelogViewSection;
