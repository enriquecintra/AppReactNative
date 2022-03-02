import React, { useState,useEffect  } from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import {styles} from "./styles";
import ButtonComponent from '../../components/Button';

interface Props {
  texto: string,
  visivel: boolean,
  onConfirme: ()=>void
}

export default function ModalComponente(props: Props) {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={props.visivel} 
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.texto}</Text>
            <ButtonComponent
              value="Fechar"
              nomeestilo="textoBotaoPurble"
              style={[styles.button, styles.buttonClose]}
              actionPress={props.onConfirme} 
            >
            </ButtonComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

