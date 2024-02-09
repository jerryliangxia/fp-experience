import { useMatcapTexture } from "@react-three/drei";

export default function Ball({ radius }) {
  const [matcapTexture] = useMatcapTexture("81ADB3_D6ECEE_BFDEE1_AFD1D7", 256);
  // 65A0C7_C3E4F8_A7D5EF_97CAE9
  // 80A6B4_D5E9EF_B2D0D9_C1DCE4
  // 596773_B3C6CE_98AFB9_879AA8
  // 487FC9_A8E7F8_88CCF2_70AFDE

  return (
    <mesh castShadow>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshMatcapMaterial matcap={matcapTexture} />
      {/* <meshNormalMaterial wireframe /> */}
    </mesh>
  );
}
