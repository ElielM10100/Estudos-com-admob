import React, { useEffect } from "react";
import { View, Text } from "react-native";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync
} from "expo-ads-admob";

const BANNER_AD_UNIT_ID = "ca-app-pub-3940256099942544/6300978111"; // ID de teste
const INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3940256099942544/1033173712"; // ID de teste

export default function IndexScreen() {
  useEffect(() => {
    const loadAds = async () => {
      try {
        // Definir o dispositivo de teste (caso seja necessário)
        await setTestDeviceIDAsync("EMULATOR");

        // Configurar anúncio intersticial
        await AdMobInterstitial.setAdUnitID(INTERSTITIAL_AD_UNIT_ID);
        await AdMobInterstitial.requestAdAsync();

        // Verificar se o anúncio está carregado antes de exibir
        const isLoaded = await AdMobInterstitial.getIsReadyAsync();
        if (isLoaded) {
          await AdMobInterstitial.showAdAsync();
        } else {
          console.log("O anúncio intersticial ainda não está pronto.");
        }
      } catch (error) {
        console.error("Erro ao carregar anúncios:", error);
      }
    };

    loadAds();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        🚀 Testando Google AdMob no Expo
      </Text>

      {/* Banner na parte inferior */}
      <AdMobBanner
        bannerSize="banner"
        adUnitID={BANNER_AD_UNIT_ID} // ID de teste
        servePersonalizedAds={false} // Sem anúncios personalizados
        onDidFailToReceiveAdWithError={(error) => 
          console.error("Erro no banner:", error)
        }
      />
    </View>
  );
}
