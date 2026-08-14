import type { Wedding } from "@/types/wedding";

type Props = {
  wedding: Wedding;
  onSignHusband: () => void;
  onSignBride: () => void;
  onRemoveHusband: () => void;
  onRemoveBride: () => void;
};

export default function WeddingPane({
  wedding,
  onSignHusband,
  onSignBride,
  onRemoveHusband,
  onRemoveBride,
}: Props) {
  const hasSign = Boolean(wedding.husband_image || wedding.bride_image);

  return (
    <div className="wedding-pane">
      <h2 className="wedding-pane-title">웨딩 정산내역</h2>

      <h3 className="wedding-pane-names">
        신랑님:{" "}
        <strong
          className={wedding.husband_image ? undefined : "select"}
          onClick={() => {
            if (!wedding.husband_image) onSignHusband();
          }}
        >
          {wedding.husband_name}
        </strong>{" "}
        <strong className="heart">♡</strong> 신부님:{" "}
        <strong
          className={wedding.bride_image ? undefined : "select"}
          onClick={() => {
            if (!wedding.bride_image) onSignBride();
          }}
        >
          {wedding.bride_name}
        </strong>
      </h3>

      {hasSign && (
        <div className="sign-pane">
          <div className="sign-pane-contents">
            <div
              className="sign-pane-item"
              onClick={() => {
                if (wedding.husband_image) onRemoveHusband();
              }}
            >
              <div className="sign-pane-content">
                <label>신랑님 서명</label>
                {wedding.husband_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={wedding.husband_image} alt="신랑 서명" />
                )}
              </div>
              {wedding.husband_image && (
                <span className="remove-text">클릭하여 삭제</span>
              )}
            </div>
            <div
              className="sign-pane-item"
              onClick={() => {
                if (wedding.bride_image) onRemoveBride();
              }}
            >
              <div className="sign-pane-content">
                <label>신부님 서명</label>
                {wedding.bride_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={wedding.bride_image} alt="신부 서명" />
                )}
              </div>
              {wedding.bride_image && (
                <span className="remove-text">클릭하여 삭제</span>
              )}
            </div>
          </div>
        </div>
      )}

      <h4 className="wedding-pane-date">
        웨딩일시: {new Date(wedding.wedding_at).toLocaleDateString("ko-KR")}{" "}
        {wedding.event_at}
      </h4>

      <hr />

      <h3 className="wedding-pane-sub-title">웨딩 비용</h3>
    </div>
  );
}
