import { FC, useState } from "react";
import {
  CardRight,
  CardsStyled,
  CardTotal,
  SingleCard,
} from "./styles/Cards.styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  deleteItemFromCart,
  emptyCard,
  updateItemInCart,
} from "../../../redux/actions/cardActions";
import { updateFavorite } from "../../../redux/reducers/favoritesSlice";
import { IProduct } from "../../../modules/types/products";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";

/* Images */
import minus from "../../../assets/svg/minus.svg";
import plus from "../../../assets/svg/plus.svg";
import del from "../../../assets/svg/delete.svg";
import SimpleModal from "../../../components/ReusuableComponents/Modal";

/* Modal Button Styles */
const styleButtonGroup = {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  marginTop: "20px",
};

const Cards: FC = () => {
  const { items, updateLoading } = useSelector(
    (state: RootState) => state.card
  );
  const { favs } = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch<AppDispatch>();
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [productForDel, setProductForDel] = useState<any>();
  const [idForDel, setIdForDel] = useState<string>("");
  const [nameForDel, setNameForDel] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");
  const width = window.innerWidth;

  /* checking item in favs */
  let fav1 = favs.find((fav: any) => productForDel?.product_id === fav.id);
  let fav2 = favs.find(
    (fav: any) => productForDel?.product_id === fav.product_id
  );

  /* Updating Card */
  const updateCard = (sign: string, id: string, q: number) => {
    let quantity = q;
    if (sign === "-") {
      quantity = q - 1;
      if (quantity > 0) {
        dispatch(updateItemInCart({ id, quantity }));
      } else {
        setModal(true);
      }
    } else {
      quantity = q + 1;
      dispatch(updateItemInCart({ id, quantity }));
    }
  };

  /* closing modal on screen click */
  window.addEventListener("click", () => {
    setModal(false);
    setModal2(false);
  });

  return (
    <>
      <CardsStyled>
        <div>
          {items?.line_items.map((item: any) => (
            <SingleCard key={item.id}>
              <div className="img">
                <Link to={`/product/params/${item.product_id}`}>
                  <img src={item?.image?.url} alt={item.name} />
                </Link>
              </div>
              <div className="about">
                <Link to={`/product/params/${item.product_id}`}>
                  <h2>
                    {item.variant?.description
                      ? item.variant?.description
                      : item.name}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>
                      <span>Qiym??ti:</span>
                      <span>{item.price.formatted_with_code}</span>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="quantity">
                <div
                  onClick={(e) => {
                    updateCard("-", item.id, item.quantity);
                    setProductForDel(item);
                    setIdForDel(item.id);
                    setUpdateId(item.id);
                    e.stopPropagation();
                    item.variant
                      ? setNameForDel(item.variant?.description)
                      : setNameForDel(item.name);
                  }}
                >
                  <img src={minus} alt="minus" />
                </div>
                <span>
                  {updateLoading === "pending" && updateId === item.id ? (
                    <CircularProgress
                      color="inherit"
                      sx={{ margin: "0 20px" }}
                    />
                  ) : (
                    <p>{item.quantity}</p>
                  )}
                </span>
                <div
                  onClick={() => {
                    updateCard("+", item.id, item.quantity);
                    setUpdateId(item.id);
                  }}
                >
                  <img src={plus} alt="plus" />
                </div>
              </div>
              <div
                className="delete"
                onClick={(e) => {
                  setModal(true);
                  setIdForDel(item.id);
                  setProductForDel(item);
                  e.stopPropagation();
                  item.variant
                    ? setNameForDel(item.variant?.description)
                    : setNameForDel(item.name);
                }}
              >
                <img src={del} alt="delete" />
              </div>
            </SingleCard>
          ))}
        </div>
        <CardRight>
          <CardTotal>
            <h2>??mumi</h2>
            <p>
              <span>M??bl????</span>
              <span>{items?.subtotal.formatted_with_code}</span>
            </p>
            <p>
              <span>??atd??r??lma</span>
              <span>0.00 USD</span>
            </p>
            <p>
              <span>C??mi</span>
              <span>{items?.subtotal.formatted_with_code}</span>
            </p>
          </CardTotal>
          <button
            onClick={(e) => {
              setModal2(true);
              e.stopPropagation();
            }}
          >
            S??b??ti t??mizl??
          </button>
          <button>S??b??ti t??sdiql??</button>
        </CardRight>
      </CardsStyled>
      <SimpleModal
        modalHeader={`Silm??k: ${nameForDel}`}
        modalTitle={`Silm??k ist??diyiniz?? ??minsiniz?: ${nameForDel}`}
        modal={modal}
        setModal={setModal}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          style={{
            display: width < 850 ? "block" : "flex",
            width: "100%",
            justifyContent: fav1 || fav2 ? "flex-end" : "space-between",
            boxShadow: "none",
            marginTop: "20px",
          }}
        >
          <div>
            <Button color="primary" onClick={() => setModal(false)}>
              Geri
            </Button>
            <Button
              color="warning"
              onClick={() => {
                dispatch(deleteItemFromCart(idForDel));
                setModal(false);
              }}
            >
              Sil
            </Button>
          </div>
          {!fav1 && !fav2 && (
            <Button
              style={{ justifySelf: "flex-end" }}
              color="success"
              onClick={() => {
                dispatch(deleteItemFromCart(idForDel));
                productForDel && dispatch(updateFavorite(productForDel));
                setModal(false);
              }}
            >
              Sil v?? Favoril??r?? ??lav?? et
            </Button>
          )}
        </ButtonGroup>
      </SimpleModal>
      <SimpleModal
        modalHeader="S??b??ti Bo??altmaq!"
        modalTitle="S??b??ti bo??altmaq ist??diyiniz?? ??minsiniz?"
        modal={modal2}
        setModal={setModal2}
      >
        <ButtonGroup sx={styleButtonGroup} disableElevation variant="contained">
          <Button color="secondary" onClick={() => setModal2(false)}>
            Geri
          </Button>
          <Button
            color="warning"
            onClick={() => {
              dispatch(emptyCard());
              setModal2(false);
            }}
          >
            Bo??alt
          </Button>
        </ButtonGroup>
      </SimpleModal>
    </>
  );
};

export default Cards;
