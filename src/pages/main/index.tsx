// outsource dependencies
import _ from 'lodash';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useState, useCallback, useMemo } from 'react';
import {
    Button,
    Container,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    ListSubheader,
    Slide,
} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

// local dependencies
import { Hits } from '../../constants/types';
import { selector } from '../../reducers/app';
import { getData } from '../../reducers/action';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
        },
        footerBtn: {
            marginTop: 20,
            padding: '20px 0',
            borderRadius: 0,
        },
        btn: {
            position: 'fixed',
            top: 10,
            right: 0,
            display: 'block',
            backgroundColor: '#000',
            zIndex: 2,
        },
    })
);

interface IProps {}

interface ICurrentData {
    id: string;
    user: string;
    tags: string;
    largeImageURL: string;
}

interface IVisible {
    id: string | null;
    isVisible: boolean;
}

const Main = memo<IProps>(() => {
    const classes = useStyles();

    const { data, currentPage } = useSelector(selector);

    const dispatch = useDispatch();
    const getDataRequest = useCallback((page: number) => dispatch(getData(page)), [dispatch]);

    const [visible, setVisible] = useState<IVisible>({ isVisible: false, id: null });

    const showMoreImage = useCallback(() => {
        getDataRequest(currentPage + 1);
    }, [currentPage, getDataRequest]);

    const isVisibleTitle = useCallback(
        (id: string | null = null) => {
            if (id || !visible.isVisible) {
                setVisible({ isVisible: true, id });
            } else if (visible.isVisible) {
                setVisible({ isVisible: false, id: null });
            }
        },
        [visible]
    );

    const currentData = useMemo(
        () =>
            _.map(data, (item: Hits) => ({
                id: item.id,
                user: item.user,
                tags: item.tags,
                largeImageURL: item.largeImageURL,
            })),
        [data]
    );

    return (
        <Container>
            <div className={classes.btn}>
                <IconButton
                    color="primary"
                    aria-label="go to gitHub"
                    href="https://github.com/aleksandrew/react-typescript-starter"
                >
                    <GitHubIcon />
                </IconButton>
            </div>

            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto', width: '100%' }}>
                        <ListSubheader component="div">Image</ListSubheader>
                    </GridListTile>
                    {_.map(currentData, (tile: ICurrentData) => (
                        <GridListTile
                            key={tile.id}
                            style={{ width: '33%' }}
                            onMouseLeave={() => isVisibleTitle()}
                            onMouseEnter={() => isVisibleTitle(tile.id)}
                        >
                            <img src={tile.largeImageURL} alt={tile.user} />
                            <Slide direction="up" in={visible.id === tile.id}>
                                <GridListTileBar title={`tags: ${tile.tags}`} subtitle={<span>by: {tile.user}</span>} />
                            </Slide>
                        </GridListTile>
                    ))}
                </GridList>

                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={showMoreImage}
                    className={classes.footerBtn}
                >
                    show more
                </Button>
            </div>
        </Container>
    );
});

export default Main;
