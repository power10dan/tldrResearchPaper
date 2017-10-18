package org.grobid.core.engines;

import org.grobid.core.GrobidModel;
import org.grobid.core.GrobidModels;
import org.grobid.core.engines.tagging.GenericTaggerUtils;
import org.grobid.core.utilities.Pair;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Created by zholudev on 11/01/16.
 * Representing label that can be tagged
 */
public enum TaggingLabels implements TaggingLabel {

    //fulltext
    CITATION_MARKER(GrobidModels.FULLTEXT, "<citation_marker>"),
    TABLE_MARKER(GrobidModels.FULLTEXT, "<table_marker>"),
    FIGURE_MARKER(GrobidModels.FULLTEXT, "<figure_marker>"),
    PARAGRAPH(GrobidModels.FULLTEXT, "<paragraph>"),
    ITEM(GrobidModels.FULLTEXT, "<item>"),
    OTHER(GrobidModels.FULLTEXT, "<other>"),
    SECTION(GrobidModels.FULLTEXT, "<section>"),
    FIGURE(GrobidModels.FULLTEXT, "<figure>"),
    TABLE(GrobidModels.FULLTEXT, "<table>"),
    EQUATION(GrobidModels.FULLTEXT, "<equation>"),

    //figures
    FIG_DESC(GrobidModels.FIGURE, "<figDesc>"),
    FIG_HEAD(GrobidModels.FIGURE, "<figure_head>"),
    FIG_TRASH(GrobidModels.FIGURE, "<trash>"),
    FIG_LABEL(GrobidModels.FIGURE, "<label>"),
    FIG_OTHER(GrobidModels.FIGURE, "<other>"),

    // table
    TBL_DESC(GrobidModels.TABLE, "<figDesc>"),
    TBL_HEAD(GrobidModels.TABLE, "<figure_head>"),
    TBL_TRASH(GrobidModels.TABLE, "<trash>"),
    TBL_LABEL(GrobidModels.TABLE, "<label>"),
    TBL_OTHER(GrobidModels.TABLE, "<other>"),

    // labels for quantities/measurements
    QUANTITY_VALUE_ATOMIC(GrobidModels.QUANTITIES, "<valueAtomic>"),
    QUANTITY_VALUE_LEAST(GrobidModels.QUANTITIES, "<valueLeast>"),
    QUANTITY_VALUE_MOST(GrobidModels.QUANTITIES, "<valueMost>"),
    QUANTITY_VALUE_LIST(GrobidModels.QUANTITIES, "<valueList>"),
    QUANTITY_UNIT_LEFT(GrobidModels.QUANTITIES, "<unitLeft>"),
    QUANTITY_UNIT_RIGHT(GrobidModels.QUANTITIES, "<unitRight>"),
    QUANTITY_VALUE_BASE(GrobidModels.QUANTITIES, "<valueBase>"),
    QUANTITY_VALUE_RANGE(GrobidModels.QUANTITIES, "<valueRange>"),
    QUANTITY_OTHER(GrobidModels.QUANTITIES, "<other>"),

    // unit of measurements
    UNIT_VALUE_BASE(GrobidModels.UNITS, "<base>"),
    UNIT_VALUE_POW(GrobidModels.UNITS, "<pow>"),
    UNIT_VALUE_PREFIX(GrobidModels.UNITS, "<prefix>"),
    UNIT_VALUE_OTHER(GrobidModels.UNITS, "<other>");

    private final GrobidModel grobidModel;
    private final String label;

    private static final ConcurrentMap<Pair<GrobidModel, String>, TaggingLabel> cache = new ConcurrentHashMap<>();

    TaggingLabels(GrobidModel grobidModel, String label) {
        this.grobidModel = grobidModel;
        this.label = label;
    }

    @Override
    public GrobidModel getGrobidModel() {
        return grobidModel;
    }

    @Override
    public String getLabel() {
        return label;
    }

    public static TaggingLabel labelFor(final GrobidModel model, final String label) {
        if (cache.isEmpty()) {
            for (TaggingLabels l : values()) {
                cache.putIfAbsent(new Pair<GrobidModel, String>(l.getGrobidModel(), l.getLabel()), l);
            }
        }

        final String plainLabel = GenericTaggerUtils.getPlainLabel(label);

        cache.putIfAbsent(new Pair<GrobidModel, String>(model, plainLabel.toString(/* null-check */)),
                new TaggingLabel() {
                    @Override
                    public String getLabel() {
                        return plainLabel;
                    }

                    @Override
                    public GrobidModel getGrobidModel() {
                        return model;
                    }
                }
        );

        return cache.get(new Pair(model, plainLabel));
    }

}
