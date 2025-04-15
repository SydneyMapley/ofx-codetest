import { Tooltip as Tt } from "radix-ui";
import styles from "./ToolTip.module.css";
import { InfoIcon } from "lucide-react";

const Tooltip = ({ content }: { content: string }) => {
  return (
    <Tt.Provider>
      <Tt.Root>
        <Tt.Trigger asChild>
          <button className={styles.IconButton}>
            <InfoIcon />
          </button>
        </Tt.Trigger>
        <Tt.Portal>
          <Tt.Content className={styles.Content} sideOffset={5}>
            {content}
            <Tt.Arrow className={styles.Arrow} />
          </Tt.Content>
        </Tt.Portal>
      </Tt.Root>
    </Tt.Provider>
  );
};
Tooltip.displayName = "Tooltip";

export default Tooltip;
