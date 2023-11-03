import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import {
  ActionRowLeftBorderInnerSVG,
  ActionRowLeftBorderOuterSVG,
  Avatar,
  CommentContent,
  Container,
  Content,
  ContentLeftBorderInnerSVG,
  ContentLeftBorderOuterSVG,
  DateText,
  EditedText,
  HorizontalTierSVG,
  Name,
  TopRowLeftBorderInnerSVG,
  TopRowLeftBorderOuterSVG,
  TopRowWrapper,
} from './styledComponents';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import { useTheme } from '@react-navigation/native';

const Comment = ({
  comment,
  index,
  nested,
  hasChildren,
  totalChildren,
  isParent,
  parentCommentLength,
  lastCommentParentId,
  lastCommentGrandId,
  isLast,
  isParentLast,
}: any) => {
  const isLastParent =
    lastCommentParentId === comment.parent_comment_id &&
    parentCommentLength - 1 === index;

  const isLastGrand = lastCommentGrandId === comment.id;

  const { color } = useTheme();

  return (
    <Container commentId={comment.id} nested={nested} bgColor={color?.bgColor}>
      <View style={styles.rowDirection}>
        {nested !== 0 ? (
          <TopRowLeftBorderInnerSVG
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isParent={isParent}
            isLastParent={isLastParent}
          />
        ) : null}

        {isParent && hasChildren && nested === 1 && !isLast ? (
          <TopRowLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isLastParent={isLastParent}
          />
        ) : null}

        {!isLast &&
        isParent &&
        hasChildren &&
        nested === 1 &&
        index - 1 < totalChildren ? (
          <TopRowLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isLastParent={isLastParent}
          />
        ) : null}

        {nested === 2 && !isParentLast ? (
          <TopRowLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isLastParent={isLastParent}
          />
        ) : null}

        {nested !== 0 ? <HorizontalTierSVG nested={nested} /> : null}

        <TopRowWrapper nested={nested} hasChildren={hasChildren}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {}}
            style={styles.renderTitleButton}
          >
            <Avatar
              source={comment?.author_profile?.profile_images?.[0]?.uri}
            />
            <Name
              accessibilityHint="tap to visit user's profile screen"
              accessibilityLabel={`user's name ${comment?.author_profile?.first_name}`}
              name={comment?.author_profile?.first_name as string}
            >
              {comment?.author_profile?.first_name}
            </Name>
          </TouchableOpacity>
        </TopRowWrapper>
      </View>

      <View style={[styles.contentWrapper]}>
        {nested === 1 && hasChildren ? (
          <ContentLeftBorderInnerSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {!isLast && !isLastParent && nested === 2 ? (
          <ContentLeftBorderInnerSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {!isLastGrand && isLastParent && parentCommentLength === 1 ? (
          <ContentLeftBorderInnerSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {!isLastGrand && isLastParent && parentCommentLength > 1 ? (
          <ContentLeftBorderInnerSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {/*top comment, parent*/}
        {isParent && hasChildren && nested === 0 ? (
          <ContentLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {nested === 1 && !isLast && !isParent ? (
          <ContentLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {isParent && hasChildren && nested === 1 && !isLast ? (
          <ContentLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {nested === 2 && !isParentLast ? (
          <ContentLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        <Content hasChildren={hasChildren} nested={nested}>
          <CommentContent
            accessibilityHint={`comment content ${comment.content}`}
            accessibilityLabel={`comment #${index + 1}`}
            selectable
            staff={comment?.author_profile?.is_staff}
          >
            {comment.content}
          </CommentContent>
          <View style={{ flexDirection: 'row' }}>
            <DateText
              accessibilityHint="the date and time the comment has been created"
              accessibilityLabel={`comment created at ${comment.created_at}`}
            >
              {moment(comment.created_at).startOf('seconds').fromNow('a')}
            </DateText>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',

                marginTop: hp(1.5),
                marginLeft: wp(7),
                flexDirection: 'row',
              }}
            >
              <Text style={{ alignSelf: 'center', color: color.g5 }}>Like</Text>
              <Text style={{ alignSelf: 'center', marginLeft: wp(2) }}>0</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: 'red',
                marginTop: hp(1.5),
                marginLeft: wp(14),
              }}
            >
              <Text style={{ alignSelf: 'center' }}>Reply</Text>
            </View>
          </View>
          {comment.edited_at ? (
            <EditedText
              accessibilityHint="comment has been edited by the creator"
              accessibilityLabel="edited comment"
            >
              (edited)
            </EditedText>
          ) : null}
        </Content>
      </View>
      <View style={styles.rowDirection}>
        {nested === 1 && hasChildren ? (
          <ActionRowLeftBorderInnerSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {!isLast && !isLastParent && nested === 2 ? (
          <ActionRowLeftBorderInnerSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {isParent && hasChildren && nested === 0 ? (
          <ActionRowLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {nested === 1 && !isLast && !isParent ? (
          <ActionRowLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {isParent && hasChildren && nested === 1 && !isLast ? (
          <ActionRowLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}

        {nested === 2 && !isParentLast ? (
          <ActionRowLeftBorderOuterSVG
            hasChildren={hasChildren}
            nested={nested}
          />
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    color: 'black',
  },
  contentWrapper: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'black',
  },
  renderTitleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowDirection: {
    flexDirection: 'row',
  },
});

export default Comment;
