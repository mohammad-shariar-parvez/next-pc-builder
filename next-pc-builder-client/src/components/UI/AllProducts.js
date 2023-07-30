import { Card, Col, Row } from "antd";
import Image from "next/image";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  StarOutlined,
  MoneyCollectOutlined,
  StockOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { addToPcBuild } from "@/redux/pcBuildSlice";


const AllProducts = ({ allProducts, category, limit = Number.POSITIVE_INFINITY }) => {
  const dispatch = useDispatch();
  const router = useRouter();


  const { Meta } = Card;

  const addPcHandler = (product) => {
    const pro = product.category.replace(/\s+/g, "");
    dispatch(addToPcBuild({ [pro]: product }));
    router.push(`/build-pc`);
  };


  return (
    <section style={{ maxWidth: "1250px", margin: "auto", paddingTop: "30px" }}>

      <Row
        gutter={[{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }, {
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }]}
        justify="center"
      >
        {allProducts?.slice(0, limit).map((product) => (
          <Col key={product.id} className="gutter-row" style={{ padding: "1px 16px" }}
            lg={{
              span: 8,
            }}
            md={{
              span: 24,
            }}
            xs={{
              span: 24,
            }}
            sm={{
              span: 24,
            }}>
            <Card

              hoverable
              cover={
                <Image
                  src={product?.image}
                  width={300}
                  height={200}
                  // style={{ padding: "16px" }}
                  alt="news image"
                />
              }
            >
              <Meta title={product?.productName} />
              <div
                className="line"
                style={{
                  height: "5px",
                  margin: "20px 0",
                  background: "#000",
                  width: "100%",
                }}
              ></div>

              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "12px",
                }}
              >
                <span>
                  <MoneyCollectOutlined /> {product?.price} BDT
                </span>
                <span>
                  <CalendarOutlined /> {product?.category}
                </span>

              </p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "12px",
                }}
              >
                <span>
                  <StockOutlined /> {product?.status}
                </span>
                <span>
                  <StarOutlined /> {product?.averageRating}
                </span>

              </p>



              {
                category ? (<p
                  onClick={() => addPcHandler(product)}
                  style={{
                    fontSize: "15px",
                    marginTop: "20px",
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    padding: "2px 5px ",
                    fontWeight: "300",
                    letterSpacing: "3px",
                    textAlign: "center",
                  }}
                >
                  ADD <ArrowRightOutlined />
                </p>)
                  :
                  (<Link href={`/products/${product?.id}`}>
                    <p
                      style={{
                        fontSize: "15px",
                        marginTop: "20px",
                        backgroundColor: "black",
                        color: "white",
                        width: "100%",
                        padding: "2px 5px ",
                        fontWeight: "300",
                        letterSpacing: "3px",
                        textAlign: "center",
                      }}
                    >
                      More Info <ArrowRightOutlined />
                    </p>
                  </Link>)
              }




            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default AllProducts;
