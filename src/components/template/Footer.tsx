import FooterItem from "./FooterItem";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center print:hidden">
      <div
        className="bg-surface fixed bottom-0 flex h-[60px] w-full max-w-[768px] overflow-x-auto"
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        }}
      >
        <FooterItem href="/member" icon="military_tech" name="회원" />
        <FooterItem href="/associate" icon="camera_enhance" name="준회원" />
        <FooterItem href="/general" icon="face" name="일반" />
        <FooterItem href="/cart" icon="shopping_cart" name="전표작성" />
        <FooterItem href="/fronts" icon="receipt_long" name="전표조회" />
      </div>
    </footer>
  );
}
